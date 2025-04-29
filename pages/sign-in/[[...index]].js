import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8 bg-gray-50">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}
