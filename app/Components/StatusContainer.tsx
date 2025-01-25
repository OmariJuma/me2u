import Status from "./Status";

function StatusContainer() {
  const contacts = [
    { name: "Alice", imageLink: "https://avatar.iran.liara.run/public/1" },
    { name: "Bob", imageLink: "https://avatar.iran.liara.run/public/2" },
    { name: "Charlie", imageLink: "https://avatar.iran.liara.run/public/3" },
    { name: "David", imageLink: "https://avatar.iran.liara.run/public/4" },
    { name: "Eve", imageLink: "https://avatar.iran.liara.run/public/5" },
    { name: "Frank", imageLink: "https://avatar.iran.liara.run/public/6" },
    { name: "Grace", imageLink: "https://avatar.iran.liara.run/public/7" },
    { name: "Heidi", imageLink: "https://avatar.iran.liara.run/public/8" },
    { name: "Ivan", imageLink: "https://avatar.iran.liara.run/public/9" },
    { name: "Judy", imageLink: "https://avatar.iran.liara.run/public/10" },
    { name: "Mallory", imageLink: "https://avatar.iran.liara.run/public/11" },
    { name: "Niaj", imageLink: "https://avatar.iran.liara.run/public/12" },
    { name: "Olivia", imageLink: "https://avatar.iran.liara.run/public/13" },
  ];
  return (
    <section className="gap-3 flex flex-row overflow-x-scroll sm:w-full md:w-1/3 lg:w-1/4">
      {contacts.map((contact) => (
        <Status
          key={contact.name}
          link={contact.imageLink}
          name={contact.name}
        />
      ))}
    </section>
  );
}

export default StatusContainer;
