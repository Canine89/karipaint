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
import { Plus, Pencil } from "lucide-react";
import { DeleteReviewButton } from "./delete-button";

export default async function AdminReviewsPage() {
  const reviews = await reviewRepository.getAll();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">고객 후기</h1>
        <Button asChild>
          <Link href="/admin/reviews/new">
            <Plus className="mr-2 h-4 w-4" />
            추가
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
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
