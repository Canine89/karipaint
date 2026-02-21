import Link from "next/link";
import { faqRepository } from "@/lib/repositories";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { DeleteFaqButton } from "./delete-button";

export default async function AdminFaqPage() {
  const faqs = await faqRepository.getAll();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">FAQ</h1>
        <Button asChild>
          <Link href="/admin/faq/new">
            <Plus className="mr-2 h-4 w-4" />
            추가
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>질문</TableHead>
              <TableHead className="max-w-[300px]">답변</TableHead>
              <TableHead className="w-[100px]">순서</TableHead>
              <TableHead className="w-[100px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  등록된 FAQ가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              faqs.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.question}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{item.answer}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/faq/${item.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">수정</span>
                        </Link>
                      </Button>
                      <DeleteFaqButton id={item.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
