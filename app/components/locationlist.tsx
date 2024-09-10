'use client';

import React from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/app/libs/firebaseConfig';
import Link from 'next/link';
import { Character } from '@/app/types/charactertype';

interface Location {
    id: string;
    name: string;
    character: Character[];
    assignedAt: Date;
}

function LocationList() {
    const [locations, setLocations] = React.useState<Location[]>([]);

    React.useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locationsQuery = query(collection(db, 'locations'));
                const locationsSnapshot = await getDocs(locationsQuery);
                const locationsData: { [key: string]: Location } = {};
                locationsSnapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = data.id;
                    const name = data.name;
                    const character = Array.isArray(data.character)
                        ? data.character
                        : [];
                    const assignedAt = data.assignedAt.toDate();

                    if (!locationsData[name]) {
                        locationsData[name] = {
                            id,
                            name,
                            character,
                            assignedAt,
                        };
                    } else {
                        locationsData[name].character = [
                            ...locationsData[name].character,
                            ...character,
                        ];
                    }
                });

                setLocations(Object.values(locationsData));
            } catch (error) {
                console.error('Error fetching locations', error);
            }
        };

        fetchLocations();
    }, []);

    if (locations.length <= 0) {
        return <div>No locations found</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row g-4 mt-2">
                {locations.map((location, index) => (
                    <div className="col-md-4" key={index} data-aos="fade-up">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{location.name}</h5>
                                <p className="card-text">
                                    Assigned At:{' '}
                                    {location.assignedAt.toString()}
                                </p>
                            </div>
                            <div className="card-footer">
                                <Link
                                    href={`/character/location/${location.name}`}
                                    className="btn btn-primary"
                                >
                                    See Character
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LocationList;
