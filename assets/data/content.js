/*
  PEPPR content catalog
  =====================
  Edit project and publication previews here. This one file feeds BOTH the
  home page and the listing pages, so a change only needs to be made once.

  To add a project: copy one whole project object, edit its fields, then copy
  projects/project-template/ to a matching folder and set href to that folder.
  Tags automatically become filter buttons. Thumbnail choices belong here too.
*/

window.PEPPR_CONTENT = {
  projects: [
    {
      title: "HET-01",
      status: "Active",
      tags: ["Electric Propulsion"],
      description:
        "Cal Poly's first custom-designed HET, a sub-kilowatt thruster driven by electromagnets and krypton.",
      lead: "Arjan Reyes",
      thumbnail: {
        src: "assets/images/HET01_cross Section 1.png",
        alt: "PEPPR member working on Project HET-01",
        fit: "cover",
      },
      href: "projects/het-1/",
      order: 1,
      featured: true,
    },
    {
      title: "Pocket Rocket",
      status: "Active",
      tags: ["Electric Propulsion", "Plasma Diagnostics"],
      description:
        "A legacy RFET thruster originally designed for CubeSat applications, now being investigated for air-breathing applications.",
      lead: "Eddy Tapia",
      thumbnail: {
        src: "assets/images/RFET_1.webp",
        alt: "PEPPR seal for the Pocket Rocket project",
        fit: "cover",
      },
      href: "projects/pocketRocket/",
      order: 2,
      featured: true,
    },
    {
      title: "Bell Jar Chamber Rebuild",
      status: "Active",
      tags: ["Space Environment"],
      description:
        "Rebuilding a 30-inch bell jar around a new well, with a turbomolecular pump and pneumatically actuated valves.",
      lead: "n/a",
      thumbnail: {
        src: "assets/images/BigGreen1.jpg",
        alt: "PEPPR research group",
        fit: "cover",
      },
      href: "projects/bigGreen/",
      order: 3,
      featured: true,
    },

    // Copy this object to add another project. The tag names may be changed
    // freely; the filter buttons are rebuilt automatically from this list.
    // {
    //   title: "New project title",
    //   status: "Planning",
    //   tags: ["Electric Propulsion", "New Topic"],
    //   description: "One-sentence project summary.",
    //   lead: "First Last",
    //   thumbnail: {
    //     src: "assets/images/your-project-photo.jpg",
    //     alt: "Describe the image for screen-reader users",
    //     fit: "cover", // use "contain" for logos/diagrams
    //   },
    //   href: "projects/new-project/",
    //   order: 4,
    //   featured: false,
    // },
  ],

  publications: [
    {
      title:
        "Numerical Investigation of Plasma Dynamics in Cal Poly’s Electrical Propulsion Vacuum Facilities",
      type: "AIAA Regional Student Conference",
      date: "January 2026",
      tags: ["Electric Propulsion", "Space Environment"],
      description:
        "Numerical plasma simulations that predict electric-propulsion plume behavior and facility effects, with planned probe measurements for validation.",
      authors: "D. Tennant, A. Presto",
      href: "publications/fascilityNumericalModelling.html",
      featured: true,
    },

    // Copy this object to add another publication.
    // {
    //   title: "Publication title",
    //   type: "Journal article or conference",
    //   date: "Month Year",
    //   tags: ["Electric Propulsion"],
    //   description: "One-sentence abstract or summary.",
    //   authors: "First Last, First Last",
    //   href: "publications/your-publication.html",
    //   featured: false,
    // },
  ],
};
