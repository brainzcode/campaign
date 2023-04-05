import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import dateFormat from 'dateformat';
import styles from '../styles/Details.module.css';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';


export default function Campaign({ data }) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			body: JSON.stringify({
				email,
				campaign: data.id,
			}),

			headers: {
				'Content-Type': 'application/json',
			},
		};

		setIsSubmitting(true);
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/`, options)
			.then((response) => response.json())
			.then(() => setIsSubmitted(true))
			.catch((error) => console.log('error', error.message))
			.finally(() => setIsSubmitting(false));

		// try {
		// 	const datum = fetch(
		// 		`${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/`,
		// 		options
		// 	);

		// 	const response = datum.json();
		//     return response
		// 	console.log('response', response);
		// } catch (error) {
		// 	error.message;
		// }
	};

	return (
		<div key={data.slug}>
			<Head>
				<title>{data.title}</title>
				<meta name='description' content={data.description} />
			</Head>

			<div className={styles.detailsWrapper}>
				<div className={styles.main}></div>

				<div className={styles.contents}>
					<div className={styles.imgContainer}>
						<Image
							className={styles.img}
							src={`http://res.cloudinary.com/dxed1l4mx/${data.logo}`}
							alt='Campaign Banner'
							height={200}
							width={200}
						/>
					</div>

					<div className={styles.grid}>
						<div className={styles.left}>
							<h1 className={styles.h2}>{data.title}</h1>
							<p className={styles.p}>{data.description}</p>
							<p className={styles.small}>
								<small>
									{dateFormat(
										new Date(data.created_at),
										'dddd, mmmm dS, yyyy, h:MM:ss TT'
									)}
								</small>
							</p>
						</div>
						{ !isSubmitted ? <div className={styles.right}>
							<div className={styles.rightContent}>
								<form
									onSubmit={handleSubmit}
									className={styles.forms}
								>
									<div className={styles.formGroup}>
										<input
											onChange={(event) =>
												setEmail(event.target.value)
											}
											className={styles.input}
											type='email'
											name='email'
											placeholder='Enter an Email'
											required
										/>
									</div>

									<div className={styles.submit}>
										<input
											className={styles.submitForm}
											type='submit'
											value={isSubmitting ? 'Please Wait' : 'Get the Free Manual'}
										/>
									</div>
								</form>
							</div>
						</div> : 
                        <div className={styles.thankYou}>
                            <div className={styles.icon}>
                                <FaCheckCircle size={45} color='green'/>
                            </div>
                            <div className={styles.iconText}>
                                Your Manual is on the way...
                            </div>
                        </div>
                        }
					</div>
				</div>
			</div>

			<footer className={styles.footer}>
				<Link href={'/'}>Go back home</Link>
			</footer>
		</div>
	);
}

export async function getStaticPaths() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/campaign/`
	);

	const data = await response.json();

	const allSlugs = data.map((item) => item.slug);
	const paths = allSlugs.map((slug) => ({ params: { slug: slug } }));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/campaign/${params.slug}/`
	);

	const data = await response.json();

	return {
		props: {
			data,
		},
	};
}
