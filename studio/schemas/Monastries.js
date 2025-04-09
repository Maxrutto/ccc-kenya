export default {
  name: "monastery",
  title: "Monastery",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "congregationName",
      title: "Congregation Name",
      type: "string",
      description: "The name of the religious congregation or order",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "image",
      title: "Monastery Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "The geographical location of the monastery",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      description: "The physical address of the monastery",
    },
    {
      name: "establishedYear",
      title: "Year Established",
      type: "number",
      description: "The year the monastery was established",
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "The email address for contacting the monastery",
    },
    {
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      description: "The phone number for contacting the monastery",
    },
    {
      name: "website",
      title: "Website",
      type: "url",
      description: "The monastery website URL (if available)",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "congregationName",
    },
  },
};
