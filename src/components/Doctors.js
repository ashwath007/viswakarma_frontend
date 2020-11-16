import React, { useState, useEffect } from 'react';
import '../cssComponent/doctors.css';
import profile from '../assets/profile.jpg';
import { Link } from 'react-router-dom';
function Doctors(props) {
	const [dbdoctors, setdbdoctors] = useState([]);
	const [dbdoctors_dis, setdbdoctors_dis] = useState([]);
	useEffect(() => {
		calling_all_doctors().then(() => {
			call_single_doctor();
		});

		// console.log(dbdoctors);
	}, []);
	const calling_all_doctors = async () => {
		const disease = props.location.state.diseases;
		fetch('https://medi-talk.herokuapp.com/api/doctors/' + disease, {
			method: 'GET',

			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setdbdoctors(data);
			});
	};
	const call_single_doctor = () => {
		const disease = props.location.state.diseases;
		const district = props.location.state.district;
		fetch(
			'https://medi-talk.herokuapp.com/api/doctors/' +
				district +
				'/' +
				disease,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((data) => setdbdoctors_dis(data));
	};
	return (
		<div>
			<div className='doctor_card'>
				{dbdoctors.map((doctor, id) => (
					<div
						className='card doctor_card'
						style={{ width: '18rem' }}
						id={doctor.id}
						key={doctor.id}
					>
						<img
							className='card-img-top'
							src={profile}
							alt={doctor.name}
							height='250px'
						/>
						<div className='card-body'>
							<div className='card-title'>
								<span style={{ fontStyle: 'bold' }}>
									Name: {doctor.name}
								</span>
							</div>
							<div className='card-title'>
								<span style={{ fontStyle: 'bold' }}>
									Specialist: {doctor.specialisation}
								</span>
							</div>
							<div className='card-title'>
								<span style={{ fontStyle: 'bold' }}>
									Hospital: {doctor.hospital}
								</span>
							</div>
							<div className='card-title'>
								<span style={{ fontStyle: 'bold' }}>
									Location: {doctor.location}
								</span>
							</div>
							<div className='card-title'>
								<span style={{ fontStyle: 'bold' }}>
									Rating : {doctor.average_rating}
								</span>
							</div>
							<Link
								to={{
									pathname: '/application',
									data: {
										dname: doctor.name,
										hname: doctor.Hospital,
									},
								}}
							>
								<button
									type='button'
									className='btn btn-success '
								>
									Consult
								</button>
							</Link>
						</div>
					</div>
				))}
			</div>
			<hr style={{ border: '0.3em', width: '0.3em' }} />
			<div>
				<h2
					style={{
						marginLeft: '30px',
						marginTop: '20px',
						color: 'GrayText',
					}}
				>
					Doctors Near you..
				</h2>
				<div className='doctor_card'>
					{dbdoctors_dis.map((doctor, id) => (
						<div
							className='card doctor_card'
							style={{ width: '18rem' }}
							id={doctor.id}
							key={doctor.id}
						>
							<img
								className='card-img-top'
								src={profile}
								alt={doctor.name}
								height='250px'
							/>
							<div className='card-body'>
								<div className='card-title'>
									<span
										style={{ fontStyle: 'bold' }}
									>
										Name: {doctor.name}
									</span>
								</div>
								<div className='card-title'>
									<span
										style={{ fontStyle: 'bold' }}
									>
										Specialist:{' '}
										{doctor.specialisation}
									</span>
								</div>
								<div className='card-title'>
									<span
										style={{ fontStyle: 'bold' }}
									>
										Hospital: {doctor.hospital}
									</span>
								</div>
								<div className='card-title'>
									<span
										style={{ fontStyle: 'bold' }}
									>
										Location: {doctor.location}
									</span>
								</div>
								<div className='card-title'>
									<span
										style={{ fontStyle: 'bold' }}
									>
										{' '}
										Rating :{' '}
										{doctor.average_rating}
									</span>
								</div>
								<Link
									to={{
										pathname: '/application',
										data: {
											dname: doctor.name,
											hname: doctor.Hospital,
										},
									}}
								>
									<button
										type='button'
										className='btn btn-success '
									>
										Consult
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Doctors;
