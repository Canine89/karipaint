import Link from "next/link";
import { reviewRepository } from "@/lib/repositories";
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
import { DeleteReviewButton } from "./delete-button";

export default async function AdminReviewsPage() {
  const reviews = await reviewRepository.getAll();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">고객 후기</h1>
        <Button asChild className="w-full sm:w-auto shrink-0">
          <Link href="/admin/reviews/new">
            <Plus className="mr-2 h-4 w-4" />
            추가
          </Link>
        </Button>
      </div>

      {/* 모바일: 카드 뷰 */}
      <div className="md:hidden space-y-3">
        {reviews.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
            등록된 후기가 없습니다.
          </div>
        ) : (
          reviews.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <p className="text-foreground line-clamp-2">&ldquo;{item.quote}&rdquo;</p>
                <p className="text-sm text-muted-foreground mt-1">
                  — {item.author}
                  {item.spaceType && ` · ${item.spaceType}`}
                </p>
                <div className="flex items-center justify-between gap-2 mt-3">
                  <span className="text-xs text-muted-foreground">순서: {item.order}</span>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/reviews/${item.id}`}>
                        <Pencil className="mr-1.5 h-3.5 w-3.5" />
                        수정
                      </Link>
                    </Button>
                    <DeleteReviewButton id={item.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 데스크톱: 테이블 */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>후기</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>공간 유형</TableHead>
              <TableHead className="w-[100px]">순서</TableHead>
              <TableHead className="w-[100px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  등록된 후기가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-[300px] truncate">{item.quote}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.spaceType}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/reviews/${item.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">수정</span>
                        </Link>
                      </Button>
                      <DeleteReviewButton id={item.id} />
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
