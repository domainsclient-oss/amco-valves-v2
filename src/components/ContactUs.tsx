"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useAuth, useUser } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { appendToGoogleSheet } from "@/app/actions/google-sheets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ContactUs() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const db = useFirestore();
  const auth = useAuth();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setLastError(null);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const messageContent = formData.get("message") as string;
    
    const submissionData = {
      metadata: { name, email, phone, message: messageContent },
      submittedAt: serverTimestamp(),
      status: "New",
      type: "Contact Form"
    };

    const googleSheetPayload = {
      "Full Name": name,
      "Email Address": email,
      "Phone Number": phone,
      "Your Message": messageContent,
      "Product Name": "Contact Form"
    };

    try {
      if (!user) {
        await signInAnonymously(auth);
      }

      const firestorePromise = addDoc(collection(db, "contactSubmissions"), submissionData)
        .catch((error) => {
          console.error("Firestore backup failed:", error);
        });

      const sheetResult = await appendToGoogleSheet(googleSheetPayload);

      if (!sheetResult.success) {
        throw new Error(sheetResult.error || "Failed to store data in Google Sheets.");
      }

      await firestorePromise;

      toast({
        title: "Inquiry Sent Successfully",
        description: `Your message has been recorded. We will contact you at ${email} shortly.`,
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error("Form Submission Error:", error);
      setLastError(error.message || "An unexpected error occurred.");
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Get In Touch</h2>
            <h3 className="text-3xl md:text-[52px] font-bold text-primary mb-6">Contact</h3>
            <p className="text-lg text-foreground/70 mb-12">
              Have questions about our products or need a custom quote? Our technical support team is ready to assist you.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Factory</h4>
                  <p className="text-foreground/60 text-sm">638/A Tiruvottriyur high road, Ajax, Chennai, 600019</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Phone className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Mobile</h4>
                  <Link href="tel:+919841114671" className="text-foreground/60 text-sm hover:text-secondary transition-colors">
                    91-9841114671
                  </Link>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Email</h4>
                  <Link href="mailto:contact@amcovalves.com" className="text-foreground/60 text-sm hover:text-secondary transition-colors">
                    contact@amcovalves.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-2" />
            <form onSubmit={handleSubmit} className="relative bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-border space-y-6">
              {lastError && (
                <Alert variant="destructive" className="bg-destructive/5">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Submission Issue</AlertTitle>
                  <AlertDescription className="text-xs">
                    {lastError}. Please ensure the spreadsheet is shared with the service account.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Full Name</label>
                  <Input name="name" required placeholder="John Doe" className="bg-background border-none h-12 focus-visible:ring-secondary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Email Address</label>
                  <Input name="email" required type="email" placeholder="john@example.com" className="bg-background border-none h-12 focus-visible:ring-secondary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Phone Number</label>
                <Input name="phone" required placeholder="91-00000-00000" className="bg-background border-none h-12 focus-visible:ring-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Your Message</label>
                <Textarea name="message" required placeholder="How can we help you?" className="bg-background border-none min-h-[150px] focus-visible:ring-secondary resize-none" />
              </div>
              <Button type="submit" className="w-full h-14 text-lg font-bold" variant="secondary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin size-5" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 size-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
