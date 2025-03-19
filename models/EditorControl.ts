import React from "react";

export interface IEditorControl {
    label: string;
    prefix: string;
    suffix: string;
    icon: React.JSX.Element | string;
    placeholder?: string;
    multiline?: boolean;
  }
  