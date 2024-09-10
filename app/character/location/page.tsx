import LocationList from '@/app/components/locationlist';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Location List',
};

export default function LocationListPage() {
    return (
        <>
            <div className="container-lg mt-4">
                <h1 data-aos="fade-right">Location List</h1>
                <LocationList />
            </div>
        </>
    );
}
