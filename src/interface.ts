import { MarkdownRemarkFrontmatter, MarkdownRemark } from './graphql-types.d';
import { ReplaceComponentRendererArgs } from 'gatsby';

export type ITemplateProps<T> = ReplaceComponentRendererArgs['props'] & {
  pageContext: {
    isCreatedByStatefulCreatePages: boolean;
  } & T;
};

export interface IPostTemplateContext {
  title: string;
  slug: string;
  date: string;
  html: string;
  excerpt: string;
  previous: IPostFrontmatter | null;
  next: IPostFrontmatter | null;
  tableOfContents: string;
  wordCount: number;
  thumbnailUrl: string;
}

export type IPostFrontmatter = Pick<IPostTemplateContext, 'title' | 'slug'>;

export interface IPostListTemplateContext {
  title: string;
  pagePath: string;
  category: string;
  nodes: Array<Pick<MarkdownRemark, 'frontmatter' | 'excerpt' | 'id'>>;
}
