"use client";

import { useEffect } from "react";

/**
 * useConsoleGreeting - Easter egg for developers who inspect the console
 * Logs a styled greeting and attaches the global letsBuild() command
 */

// TypeScript declaration for global window functions
declare global {
  interface Window {
    letsBuild: () => {
      Status: string;
      Expertise: string[];
      Contact: string;
    };
    hireMe: () => {
      Status: string;
      Expertise: string[];
      Contact: string;
    };
  }
}

export function useConsoleGreeting() {
  useEffect(() => {
    // Styled header
    const headerStyle = "background: linear-gradient(90deg, #0f172a, #1e293b); color: #3b82f6; font-size: 14px; padding: 12px 20px; border-radius: 8px; font-weight: bold;";
    const subStyle = "color: #94a3b8; font-size: 12px;";
    const secretStyle = "color: #f59e0b; font-size: 11px; font-style: italic;";

    console.log("%c👋 Hey! I see you peeking under the hood.", headerStyle);
    console.log("%cHere's the payload you requested:", subStyle);
    
    // Structured data table
    console.table({
      "Engineer": "Dhwani Suthar",
      "Role": "Data Engineer (FinOps & AI)",
      "Location": "Bangalore, India 🇮🇳",
      "Education": "B.Tech CS @ CHARUSAT (9.79 CGPA)",
      "Fuel": "Masala Chai ☕",
      "Architecture": "Next.js + Tailwind (Clean & Cost-Optimized)",
      "Mission": "Building systems that save millions",
      "Fun Fact": "I paint with oil colors too 🎨",
    });

    console.log("%c💡 Secret: Try typing letsBuild() in the console...", secretStyle);

    // Main command function
    const buildCommand = () => {
      const titleStyle = "color: #22c55e; font-size: 20px; font-weight: bold;";
      const bodyStyle = "color: #94a3b8; font-size: 12px; line-height: 1.6;";
      
      console.log("%c🚀 Ready to Deploy?", titleStyle);
      console.log("%cI build self-healing data pipelines that save money.\nIf you have a complex infrastructure challenge, let's talk.", bodyStyle);
      
      // ASCII art - LETS BUILD
      console.log(`
%c
  ██╗     ███████╗████████╗███████╗    ██████╗ ██╗   ██╗██╗██╗     ██████╗ 
  ██║     ██╔════╝╚══██╔══╝██╔════╝    ██╔══██╗██║   ██║██║██║     ██╔══██╗
  ██║     █████╗     ██║   ███████╗    ██████╔╝██║   ██║██║██║     ██║  ██║
  ██║     ██╔══╝     ██║   ╚════██║    ██╔══██╗██║   ██║██║██║     ██║  ██║
  ███████╗███████╗   ██║   ███████║    ██████╔╝╚██████╔╝██║███████╗██████╔╝
  ╚══════╝╚══════╝   ╚═╝   ╚══════╝    ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ 
`, "color: #22c55e; font-family: monospace;");

      return {
        Status: "Available for new projects",
        Expertise: ["FinOps", "Data Engineering", "Multi-Cloud"],
        Contact: "dhwani.suthar02@gmail.com",
      };
    };

    // Attach global letsBuild() command
    window.letsBuild = buildCommand;
    
    // Keep hireMe() as an alias for backwards compatibility
    window.hireMe = buildCommand;

    // Cleanup
    return () => {
      // @ts-ignore
      delete window.letsBuild;
      // @ts-ignore
      delete window.hireMe;
    };
  }, []);
}

export default useConsoleGreeting;
