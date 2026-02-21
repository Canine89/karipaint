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
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { DeleteFaqButton } from "./delete-button";

export default async function AdminFaqPage() {
  const faqs = await faqRepository.getAll();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">FAQ</h1>
        <Button asChild className="w-full sm:w-auto shrink-0">
          <Link href="/admin/faq/new">
            <Plus className="mr-2 h-4 w-4" />
            추가
          </Link>
        </Button>
      </div>

      {/* 모바일: 카드 뷰 */}
      <div className="md:hidden space-y-3">
        {faqs.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-8 md:p-10 text-center">
            <p className="text-muted-foreground mb-4">등록된 FAQ가 없습니다.</p>
            <Button asChild>
              <Link href="/admin/faq/new">
                <Plus className="mr-2 h-4 w-4" />
                첫 FAQ 등록하기
              </Link>
            </Button>
          </div>
        ) : (
          faqs.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <p className="font-medium text-foreground line-clamp-2">{item.question}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.answer}</p>
                <div className="flex items-center justify-between gap-2 mt-3">
                  <span className="text-xs text-muted-foreground">순서: {item.order}</span>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/faq/${item.id}`}>
                        <Pencil className="mr-1.5 h-3.5 w-3.5" />
                        수정
                      </Link>
                    </Button>
                    <DeleteFaqButton id={item.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 데스크톱: 테이블 */}
      <div className="hidden md:block rounded-lg border overflow-x-auto">
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
                <TableCell colSpan={4} className="text-center py-10">
                  <p className="text-muted-foreground mb-4">등록된 FAQ가 없습니다.</p>
                  <Button asChild size="sm">
                    <Link href="/admin/faq/new">
                      <Plus className="mr-2 h-4 w-4" />
                      첫 FAQ 등록하기
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              faqs.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
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
