import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        submission: {
          id: submission.id,
          submittedAt: submission.submittedAt
        }
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({
          success: false,
          message: "Invalid form data. Please check your inputs.",
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while submitting your message. Please try again."
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching submissions."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
