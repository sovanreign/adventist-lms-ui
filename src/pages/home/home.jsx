import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

export default function Home() {
  const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];

  return (
    <main>
      <Sidebar />

      <div className="ml-64">
        <Navbar title={"Home"} />

        <div className="p-8">
          <h1 className="font-semibold text-lg mb-8">Announcement</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div key={index} className="card card-xl bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={img}
                    alt={`Card ${index + 1}`}
                    className="w-full h-64 object-fit"
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
