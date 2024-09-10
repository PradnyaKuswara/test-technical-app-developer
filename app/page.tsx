import { Metadata } from 'next';
import CharacterList from './components/characterlist';

export const metadata: Metadata = {
    title: 'Character List | Rick and Morty',
};

export default function CharacterListPage() {
    return (
        <>
            <div className="container-lg mt-4">
                <h1 data-aos="fade-right">Character List</h1>
                <CharacterList />
            </div>
        </>
    );
}
