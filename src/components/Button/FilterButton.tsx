"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type FilterButtonProps = {
  active: boolean;
  label: string | ReactNode;
  onClick: () => void;
};

const FilterButton = ({ active, label, onClick }: FilterButtonProps) => {
  return (
    <Button variant={active ? "default" : "outline"} onClick={onClick}>
      {label}
    </Button>
  );
};

export default FilterButton;
