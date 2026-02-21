import Link from "next/link";
import { portfolioRepository } from "@/lib/repositories";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeletePortfolioButton } from "./delete-button";

export default async function AdminPortfolioPage() {
  const portfolios = await portfolioRepository.getAll();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">포트폴리오</h1>
        <Button asChild className="w-full sm:w-auto shrink-0">
          <Link href="/admin/portfolio/new">
            <Plus className="mr-2 h-4 w-4" />
            추가
          </Link>
        </Button>
      </div>

      {/* 모바일: 카드 뷰 */}
      <div className="md:hidden space-y-3.5">
        {portfolios.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-8 text-center">
            <p className="text-muted-foreground mb-4">등록된 시공 사례가 없습니다.</p>
            <Button asChild>
              <Link href="/admin/portfolio/new">
                <Plus className="mr-2 h-4 w-4" />
                첫 시공 사례 등록하기
              </Link>
            </Button>
          </div>
        ) : (
          portfolios.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1.5">
                  {item.category} · {item.region} · {item.duration}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button asChild variant="outline" size="sm" className="flex-1 h-10">
                    <Link href={`/admin/portfolio/${item.id}`}>
                      <Pencil className="mr-1.5 h-3.5 w-3.5" />
                      수정
                    </Link>
                  </Button>
                  <DeletePortfolioButton id={item.id} />
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
              <TableHead>제목</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>지역</TableHead>
              <TableHead>소요일</TableHead>
              <TableHead className="w-[100px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <p className="text-muted-foreground mb-4">등록된 시공 사례가 없습니다.</p>
                  <Button asChild size="sm">
                    <Link href="/admin/portfolio/new">
                      <Plus className="mr-2 h-4 w-4" />
                      첫 시공 사례 등록하기
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              portfolios.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/portfolio/${item.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">수정</span>
                        </Link>
                      </Button>
                      <DeletePortfolioButton id={item.id} />
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
