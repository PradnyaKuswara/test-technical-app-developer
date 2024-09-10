import CharacterDetail from '@/app/components/characterdetail';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Character List Detail',
};

export default async function CharacterListDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <>
            <div className="container-lg mt-4">
                <h1 data-aos="fade-right">Character List Detail</h1>
                <CharacterDetail id={params.id} />
            </div>
        </>
    );
}
