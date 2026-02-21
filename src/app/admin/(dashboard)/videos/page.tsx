import Link from "next/link";
import { videoRepository } from "@/lib/repositories";
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
import { DeleteVideoButton } from "./delete-button";

export default async function AdminVideosPage() {
  const videos = await videoRepository.getAll();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">시공 영상</h1>
        <Button asChild className="w-full sm:w-auto shrink-0">
          <Link href="/admin/videos/new">
            <Plus className="mr-2 h-4 w-4" />
            추가
          </Link>
        </Button>
      </div>

      {/* 모바일: 카드 뷰 */}
      <div className="md:hidden space-y-3.5">
        {videos.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-8 text-center">
            <p className="text-muted-foreground mb-4">등록된 영상이 없습니다.</p>
            <Button asChild>
              <Link href="/admin/videos/new">
                <Plus className="mr-2 h-4 w-4" />
                첫 영상 등록하기
              </Link>
            </Button>
          </div>
        ) : (
          videos.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-1">
                  {item.youtubeUrl}
                </p>
                <div className="flex items-center justify-between gap-2 mt-4">
                  <span className="text-xs text-muted-foreground">순서: {item.order}</span>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="h-10">
                      <Link href={`/admin/videos/${item.id}`}>
                        <Pencil className="mr-1.5 h-3.5 w-3.5" />
                        수정
                      </Link>
                    </Button>
                    <DeleteVideoButton id={item.id} />
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
              <TableHead>제목</TableHead>
              <TableHead>YouTube URL</TableHead>
              <TableHead className="w-[80px]">순서</TableHead>
              <TableHead className="w-[100px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <p className="text-muted-foreground mb-4">등록된 영상이 없습니다.</p>
                  <Button asChild size="sm">
                    <Link href="/admin/videos/new">
                      <Plus className="mr-2 h-4 w-4" />
                      첫 영상 등록하기
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              videos.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="max-w-[300px] truncate text-muted-foreground">
                    {item.youtubeUrl}
                  </TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/videos/${item.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">수정</span>
                        </Link>
                      </Button>
                      <DeleteVideoButton id={item.id} />
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
