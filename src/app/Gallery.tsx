/* eslint-disable @next/next/no-img-element */

const Gallery = async () => {
  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`
  );
  const data = await res.json();

  const totalPost: number = 23;
  const postPerPage: number = 9;

  const totalPages: number = Math.ceil(totalPost / postPerPage);

  const pageNumbers = [...Array(totalPages).keys()];
  return (
    <>
      <h1 className="text-center text-5xl font-bold mt-12">
        Instagram Gallery
      </h1>
      <div className="grid grid-cols-3 gap-4 px-12 mt-12 justify-center">
        {data.data.map((pics: any) => (
          <>
            <img
              className="object-cover aspect-square rounded-sm hover:scale-110 transition-all duration-300"
              src={pics.media_url}
              alt=""
            />
          </>
        ))}
      </div>
      <div className="flex justify-center mb-12 gap-6">
        {pageNumbers.map((number) => (
          <button key={number} className="">
            {number}
          </button>
        ))}
      </div>
    </>
  );
};

export default Gallery;
