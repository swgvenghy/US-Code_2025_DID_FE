"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Card, CardContent } from "@/components/ui/card";

interface MarkdownViewerProps {
  /** 렌더링할 Markdown 문자열 */
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <Card className='w-full scroll-auto  '>
      <CardContent>
        <div className='prose dark:prose-invert prose-headings:mt-4 prose-headings:mb-2 prose-img:rounded-lg prose-img:shadow'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
