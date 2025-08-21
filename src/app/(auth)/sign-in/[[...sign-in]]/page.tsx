import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/d7/b9/0c/d7b90cc80898e8823455a127945719af.jpg')",
      }}
    >
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8">
        <SignIn
          appearance={{
            elements: {
              card: "bg-transparent shadow-none text-white",
              headerTitle: "text-black/70 text-3xl font-bold text-center",
              headerSubtitle: "text-black/60 text-center",
              formFieldLabel: "hidden",
              formFieldInput:
                "bg-transparent border border-white/30 text-white placeholder-white focus:border-white",
              footerActionText: "text-black/50",
              footerActionLink: "text-black underline hover:no-underline",
              socialButtonsBlockButton: "bg-white text-black hover:opacity-90",
            },
          }}
        />
      </div>
    </div>
  );
}
