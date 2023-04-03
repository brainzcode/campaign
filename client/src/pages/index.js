import Head from 'next/head';
import Image from 'next/image';
import dateFormat from "dateformat";
import styles from '../styles/Home.module.css';

export default function Home({ data, error }) {
	return (
		<div>
			<Head>
				<title>Tech Campaign: | Home</title>
				<meta
					name='description'
					content='I manage various Tech Campagns here.'
				/>
			</Head>
			<main className={styles.main}>
				<div className={styles.innerContent}>
					<h1>Available Campaigns</h1>
					{error && <p>{JSON.stringify(error)}</p>}
					{data.map((el) => (
						<div key={el.slug}>
							<div className={styles.item}>
								<div className={styles.imgContainer}>
									<Image
										className={styles.img}
										src={`http://res.cloudinary.com/dxed1l4mx/${el.logo}`}
										alt='Campaign Banner'
										height={120}
										width={120}
									/>
								</div>
								<div className={styles.rightItem}>
									<h1>{el.title}</h1>
									<p>{el.description}</p>
									<small>{dateFormat(new Date(el.created_at), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</small>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	let data = [];
	let error = null;

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/campaign/`
		);

		data = await response.json();
	} catch (err) {
		error = err.message ? err.message : 'Something went wrong!';
	}

	return {
		props: {
			data,
			error,
		},
	};
}
