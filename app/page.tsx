// app/page.tsx
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Reliable power systems, servicing & controls
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              We deliver generator maintenance, ATS & synchronization panels, gas turbine implementation, system control and turnkey power solutions for industrial clients.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#contact" className="bg-gradient-to-r from-[#19c9fa] to-[#70e84f] px-5 py-3 rounded-2xl shadow">Contact Us</a>
              <a href="#projects" className="border border-gray-200 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#70e84f] to-[#19c9fa]">Our Projects</a>
            </div>
          </div>

          <div>
            <div className="bg-accent rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold">Request a quote</h3>
              <p className="text-sm text-gray-500 mt-1">Quick — we&apos;ll get back within one business day.</p>
              <div id="contact" className="mt-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              About Isaac Okhua Tech Co.
            </h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At <strong>Isaac Okhua Tech</strong>, we specialize in providing cutting-edge
              engineering solutions in power systems, control automation, generator
              servicing, ATS and synchronization panels, and gas turbine implementation.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our team of skilled engineers and technicians deliver reliable,
              efficient, and cost-effective energy and control solutions designed to
              meet the growing industrial and infrastructural demands of Africa.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              From concept to commissioning, we handle projects of all scales —
              ensuring safety, sustainability, and performance at every stage.
            </p>
            <ul className="list-disc ml-5 text-gray-700 mt-3">
              <li>Power system installation and automation</li>
              <li>Generator servicing and maintenance</li>
              <li>ATS & synchronization panel design</li>
              <li>Gas turbine and industrial control systems</li>
              <li>Renewable energy integration</li>
            </ul>
            <div className="mt-8">
              <a
                href="/contact"
                className="bg-gradient-to-r from-[#19c9fa] to-[#70e84f] text-white px-6 py-3 rounded-xl shadow transition"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/iot-background.png"
              alt="IOT Engineering team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Generator Servicing & Maintenance', text: 'Planned and emergency maintenance, load testing and overhaul.' },
            { title: 'ATS & Synchronization Panels', text: 'Design, build and commission automatic transfer and sync panels.' },
            { title: 'Gas Turbine Implementation', text: 'Site assessment, integration and commissioning for gas turbine systems.' },
            { title: 'Power System Control', text: 'SCADA, PLC and control system design, deployment and support.' },
            { title: 'Installation & Commissioning', text: 'Complete plant installations: civil, mechanical and electrical.' },
            { title: 'Spare Parts & Upgrades', text: 'Genuine parts procurement and system modernization.' }
          ].map(s => (
            <div key={s.title} className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold">Selected Projects</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow">
              <div className="h-40 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">Project Image</div>
              <div className="p-4">
                <h4 className="font-semibold">Power Plant Synchronization</h4>
                <p className="text-sm text-gray-500 mt-1">Full multi-generator synchronization and control upgrade.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow">
              <div className="h-40 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">Project Image</div>
              <div className="p-4">
                <h4 className="font-semibold">Industrial ATS Panels</h4>
                <p className="text-sm text-gray-500 mt-1">Custom ATS and load shedding solutions.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow">
              <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">Project Image</div>
              <div className="p-4">
                <h4 className="font-semibold">Gas Turbine Integration</h4>
                <p className="text-sm text-gray-500 mt-1">Turbine control and plant interface project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
