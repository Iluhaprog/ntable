import * as React from "react";
import * as MUI from "@mui/material";

export interface ITableHeadProps {
  children: JSX.Element | JSX.Element[];
}

export function TableHead (props: ITableHeadProps) {
  const { children } = props;

  return (
    <MUI.TableHead>
      <MUI.TableRow>
        {children}
      </MUI.TableRow>
    </MUI.TableHead>
  )
}