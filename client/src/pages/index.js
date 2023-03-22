import Image from 'next/image'


export default function Home({ data, error }) {


	return (
		<div>
			<main>
				<h1>Available Campaigns</h1>
        {error && <p>{JSON.stringify(error)}</p>}
				{data.map((el) => (
					<div key={el.slug}>
            <div>
              <Image src={`http://res.cloudinary.com/dxed1l4mx/${el.logo}`} alt="Campaign Banner" height={120} width={120} />
              <div>
                <h1>{el.title}</h1>
                <p>{el.description}</p>
                <p>{el.created_at}</p>
              </div>
            </div>
          </div>
				))}
			</main>
		</div>
	);
}

export async function getStaticProps() {
	let data = [];
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaign/`);

	  data = await response.json();
  } catch (err) {
    error = err.message ? err.message : 'Something went wrong!'
  }



	return {
		props: {
			data,
			error,
		},
	};
}
