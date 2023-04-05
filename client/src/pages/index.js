import Head from 'next/head';
import Image from 'next/image';
import dateFormat from 'dateformat';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ data, error }) {

	const router = useRouter()

	const handleNavigate = ({ slug }) => {
		router.push('/' + slug)
	}

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
					<h1 className={styles.h1}>Available Campaigns</h1>
					{error && <p>{JSON.stringify(error)}</p>}
					{data.map((el) => (
						<div key={el.slug}>
							<div className={styles.item} onClick={() => handleNavigate(el)}>
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
									<div>

									<Link
										href={'/' + el.slug}
										className={styles.h2}
									>
										{el.title}
									</Link>
									<p className={styles.p}>{el.description}</p>
									</div>
									<div className={styles.camp}>
									<small className={styles.small}>
										{dateFormat(
											new Date(el.created_at),
											'dddd, mmmm dS, yyyy, h:MM:ss TT'
										)}
									</small>
										<small className={styles.campaign}>See Campaign</small>
									</div>
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
