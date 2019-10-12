import { CreatePagesArgs } from 'gatsby';
import path from 'path';
import { Query, MarkdownRemark } from '../graphql-types';
import { IPostFrontmatter, IPostTemplateContext } from '../interface';

const getNextOrPreviousData = (data: MarkdownRemark | null): IPostFrontmatter | null =>
    data ? { title: data.frontmatter.title, slug: data.frontmatter.slug } : null;

export async function createPages({ actions, graphql }: CreatePagesArgs) {
    const { createPage } = actions;

    const { data, errors } = await graphql<Query>(`
        {
            allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
                edges {
                    node {
                        html
                        excerpt(truncate: true, pruneLength: 200)
                        frontmatter {
                            title
                            slug
                            date
                        }
                        tableOfContents(pathToSlugField: "frontmatter.slug", heading: null)
                    }
                    next {
                        frontmatter {
                            title
                            slug
                        }
                    }
                    previous {
                        frontmatter {
                            title
                            slug
                        }
                    }
                }
            }
        }
    `);

    if (errors) {
        throw errors;
    }

    data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
        createPage<IPostTemplateContext>({
            path: node.frontmatter.slug,
            context: {
                html: node.html,
                slug: node.frontmatter.slug,
                title: node.frontmatter.title,
                date: node.frontmatter.date,
                excerpt: node.excerpt,
                next: getNextOrPreviousData(next),
                previous: getNextOrPreviousData(previous),
                tableOfContents: node.tableOfContents,
            },
            component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
        });
    });
}
