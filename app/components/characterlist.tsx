'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Character, CharacterInfo } from '@/app/types/charactertype';

function CharacterList() {
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [characterInfo, setCharacterInfo] = React.useState<CharacterInfo>({
        count: 0,
        pages: 0,
        next: '',
        prev: '',
    });
    const [page, setPage] = React.useState<number>(1);

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const fetchData = async (page: number) => {
        if (!apiUrl) {
            setError('API URL is not defined');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `{
                        characters(page: ${page}) {
                            info {
                                count
                                pages
                                next
                                prev
                            }
                            results {
                                id
                                name
                                status
                                species
                                type
                                gender
                                origin {
                                    name
                                }
                                location {
                                    name
                                }
                                image
                                episode {
                                    name
                                    air_date
                                    episode
                                }
                                created
                            }
                        }
                    }`,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setCharacters(data.data.characters.results);
            setCharacterInfo(data.data.characters.info);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        setLoading(true);
        setError(null);

        fetchData(page);
    }, [page]);

    const handlePagination = (newPage: number) => {
        setLoading(true);
        setError(null);
        setPage(newPage);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4">
            <div
                className="d-flex justify-content-between align-items-center"
                data-aos="fade"
            >
                <p>
                    {page} of {characterInfo.pages} Page
                </p>

                <div className="d-flex gap-2">
                    {characterInfo.prev ? (
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                handlePagination(parseInt(characterInfo.prev))
                            }
                        >
                            Prev
                        </button>
                    ) : (
                        <button className="btn btn-primary disabled">
                            Prev
                        </button>
                    )}

                    {characterInfo.next ? (
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                handlePagination(parseInt(characterInfo.next))
                            }
                        >
                            Next
                        </button>
                    ) : (
                        <button className="btn btn-primary disabled">
                            Next
                        </button>
                    )}
                </div>
            </div>

            <div className="row g-4 mt-2">
                {characters.map((character) => (
                    <div
                        key={character.id}
                        className="col-md-4"
                        data-aos="fade-up"
                    >
                        <Link href={`/character/detail/${character.id}`}>
                            <div className="card h-100  border-0">
                                <div className="d-flex justify-content-center ratio-16x9 border-1 ">
                                    <Image
                                        src={character.image}
                                        className="rounded-top img-fluid"
                                        width={200}
                                        height={200}
                                        alt={character.name}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                                <div className="card-body">
                                    <h3 className="h5 card-title text-center">
                                        {character.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterList;
