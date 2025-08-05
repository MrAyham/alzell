export const Contact = () => (
  <section className="py-20">
    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
    <form className="flex flex-col gap-4 max-w-md">
      <input type="text" placeholder="Name" className="border p-2" />
      <input type="email" placeholder="Email" className="border p-2" />
      <textarea placeholder="Message" className="border p-2" rows={4}></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
    </form>
  </section>
);

export default Contact;
