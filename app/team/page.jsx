// pages/team.js

import Image from 'next/image';
import Link from 'next/link';

const Team = () => {

    const teamMembers = [
        {
            name: 'John Doe',
            description: 'Full Stack Developer',
            githubUsername: 'Victoria240',
            image: '/images/john-doe.jpg',
            width: 200, 
            height: 200,
        },
        {
            name: 'Jane Smith',
            description: 'UI/UX Designer',
            githubUsername: 'Victoria240',
            image: '/images/jane-smith.jpg',
            width: 200,
            height: 200,
        },
       
    ];

    return (
        <div>
            <h2>Meet the team</h2>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <Image src={member.image} alt={member.name} width={member.width} height={member.height} />
                        <h3>{member.name}</h3>
                        <p>{member.description}</p>
                        <Link href={`https://github.com/${member.githubUsername}`} passHref> GitHub
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
