import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8 bg-gray-50">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}
