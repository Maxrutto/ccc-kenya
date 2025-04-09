export default {
  name: "initiative",
  title: "Initiative",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "When did this initiative begin?",
    },
    {
      name: "ongoing",
      title: "Ongoing",
      type: "boolean",
      description: "Is this initiative still active?",
    },
    {
      name: "monasteries",
      title: "Participating Monasteries",
      type: "array",
      of: [{ type: "reference", to: { type: "monastery" } }],
    },
    {
      name: "externalLink",
      title: "External Link",
      type: "url",
      description:
        "Link to external resource or partner website for this initiative",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      monasteries: "monasteries",
    },
    prepare(selection) {
      const { monasteries } = selection;
      return Object.assign({}, selection, {
        subtitle:
          monasteries && `${monasteries.length} participating monasteries`,
      });
    },
  },
};
