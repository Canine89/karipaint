import { FaqForm } from "../FaqForm";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">FAQ 등록</h1>
      <FaqForm />
    </div>
  );
}
