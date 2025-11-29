import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              SN
            </div>
            <div>
              <h1 className="text-lg font-bold">Siddhinath Chakraborty</h1>
              <p className="text-xs text-gray-500">
                B.Tech CSE (AI & ML) • RCCIIT Kolkata
              </p>
            </div>
          </div>
          <nav className="space-x-4 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Hi, I’m Siddhinath — building smart things with code.
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              I’m a 1st-year B.Tech student at RCCIIT Kolkata studying Computer 
              Science with a focus on AI & ML. I love web development, chess, 
              and creating visual content.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-block px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:opacity-95"
              >
                See my projects
              </a>
              <a
                href="#contact"
                className="inline-block px-5 py-3 border border-gray-300 rounded-lg"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-6 text-sm text-gray-600 space-y-1">
              <p>
                Phone: <a href="tel:+917586089492" className="hover:underline">+91 75860 89492</a>
              </p>
              <p>
                Email: <a href="mailto:siddhinathchakraborty@gmail.com" className="hover:underline">siddhinathchakraborty@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-pink-100 to-indigo-100 flex items-center justify-center shadow-lg">
              <div className="text-center p-4">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-2xl font-bold">
                  SN
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Replace this with your photo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mt-16 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-semibold">About Me</h3>
          <p className="mt-3 text-gray-700">
            I’m a B.Tech CSE (AI & ML) student at RCCIIT Kolkata. My goals include
            topping my department, improving my chess skills, and building useful
            technology projects.
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Skills</h4>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                <li>Java, C, Python</li>
                <li>React, Tailwind CSS</li>
                <li>Basics of Machine Learning</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Interests</h4>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                <li>Web Development</li>
                <li>Chess</li>
                <li>Visual Content Creation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-10">
          <h3 className="text-2xl font-semibold">Projects</h3>
          <p className="text-sm text-gray-600 mt-2">Replace with your real projects soon.</p>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <article className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold">Personal Portfolio</h4>
              <p className="text-sm text-gray-600 mt-2">
                This portfolio site built with React + Tailwind.
              </p>
            </article>

            <article className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold">Chess Training Tracker</h4>
              <p className="text-sm text-gray-600 mt-2">
                App concept to track puzzles & tournament progress.
              </p>
            </article>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-semibold">Contact</h3>
          <p className="text-sm text-gray-600 mt-2">Send me a message.</p>

          <form
            className="mt-4 grid sm:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              alert("Form not connected. Use Formspree or EmailJS.")
            }}
          >
            <input
              type="text"
              placeholder="Your name"
              className="p-3 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              className="p-3 border rounded"
              required
            />
            <textarea
              placeholder="Message"
              className="p-3 border rounded sm:col-span-2"
              rows={4}
              required
            ></textarea>
            <button
              type="submit"
              className="sm:col-span-2 px-4 py-3 bg-indigo-600 text-white rounded hover:opacity-95"
            >
              Send message
            </button>
          </form>
        </section>
      </main>

      <footer className="mt-12 py-6 bg-white border-t">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Siddhinath Chakraborty — Built with ❤️
        </div>
      </footer>
    </div>
  )
}

export default App
