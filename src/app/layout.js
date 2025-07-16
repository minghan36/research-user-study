import "./globals.css";
import { ParticipantProvider } from "../contexts/ParticipantContext";


export const metadata = {
  title: "User Study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ParticipantProvider>
          {children}
        </ParticipantProvider>
      </body>
    </html>
  );
}
