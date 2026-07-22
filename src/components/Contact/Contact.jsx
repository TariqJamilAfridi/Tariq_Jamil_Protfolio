import Button from "../common/Button/Button";

function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-slate-900 text-white"
    >
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Contact Me
        </h2>

        <form className="space-y-6">

          {/* Name */}

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          />

          {/* Email */}

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          />

          {/* Subject */}

          <input
            type="text"
            placeholder="Subject"
            className="w-full p-4 rounded-xl bg-slate-800 outline-none"
          />

          {/* Message */}

          <textarea
            rows="6"
            placeholder="Write your message..."
            className="w-full p-4 rounded-xl bg-slate-800 outline-none resize-none"
          ></textarea>

          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Send Message
          </Button>

        </form>

      </div>
    </section>
  );
}

export default Contact;