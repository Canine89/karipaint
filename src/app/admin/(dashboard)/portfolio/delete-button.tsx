"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deletePortfolio } from "../../actions";

export function DeletePortfolioButton({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">삭제</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            이 시공 사례를 삭제하면 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={deletePortfolio.bind(null, id)}>
            <Button type="submit" variant="destructive">
              삭제
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
