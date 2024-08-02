// pages/download/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface Build {
    id: number;
    name: string;
    hash: string;
    date: string;
    version: string;
    tag: string;
    type: string;
    downloadLink: string;
    githubLink: string;
}

const DownloadPage = () => {
    const [builds, setBuilds] = useState<Build[]>([]);
    const [filteredBuilds, setFilteredBuilds] = useState<Build[]>([]);
    const [selectedRepoType, setSelectedRepoType] = useState<string>('Tout');
    const [selectedTag, setSelectedTag] = useState<string>('Tag');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('Toute période');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 15;

    const fetchBuilds = async () => {
        const urls = [
            'https://github.com/SecureEduMailProject/SecureEduMail/releases.atom',
            'https://github.com/SecureEduMailProject/SecureEduRest/releases.atom',
            'https://github.com/SecureEduMailProject/SecureEduCrypt/releases.atom'
        ];

        const allBuilds: Build[] = [];
        for (const url of urls) {
            const { data } = await axios.get(url);
            const parsedData = await parseStringPromise(data);

            parsedData.feed.entry.forEach((entry: any) => {
                const content = entry.content[0]._;
                const build: Build = {
                    id: parseInt(content.match(/Id : (\d+)/)[1]),
                    name: content.match(/Name : (.+?)<br>/)[1],
                    hash: content.match(/Hash : (.+?)<br>/)[1],
                    date: content.match(/Date : (.+?)<br>/)[1],
                    version: content.match(/V : (.+?)<br>/)[1],
                    tag: content.match(/Tag : (.+?)<br>/)[1],
                    type: url.includes('SecureEduMail') ? 'SecureEduMail' : url.includes('SecureEduRest') ? 'SecureEduRest' : 'SecureEduCrypt',
                    downloadLink: `${url.split('/releases.atom')[0]}/releases/download/${entry.title[0]}/${content.match(/Name : (.+?)<br>/)[1]}`,
                    githubLink: entry.link[0].$.href
                };
                allBuilds.push(build);
            });
        }

        setBuilds(allBuilds);
        setFilteredBuilds(allBuilds);
    };

    useEffect(() => {
        fetchBuilds();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = builds.filter(build =>
            build.name.toLowerCase().includes(searchTerm) ||
            build.hash.toLowerCase().includes(searchTerm) ||
            build.version.toLowerCase().includes(searchTerm) ||
            build.date.toLowerCase().includes(searchTerm) ||
            build.type.toLowerCase().includes(searchTerm)
        );
        setFilteredBuilds(filtered);
        setCurrentPage(1);
    };

    const handleRepoTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRepoType(event.target.value);
        filterBuilds(event.target.value, selectedTag, selectedPeriod);
    };

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
        filterBuilds(selectedRepoType, event.target.value, selectedPeriod);
    };

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(event.target.value);
        filterBuilds(selectedRepoType, selectedTag, event.target.value);
    };

    const filterBuilds = (repoType: string, tag: string, period: string) => {
        const now = new Date();
        const filtered = builds.filter(build => {
            const buildDate = new Date(build.date);
            const matchesRepoType = repoType === 'Tout' || build.type === repoType;
            const matchesTag = tag === 'Tag' || build.tag === tag;
            let matchesPeriod = true;

            switch (period) {
                case 'Dernière heure':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 3600000;
                    break;
                case 'Dernier jour':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 86400000;
                    break;
                case 'Dernier mois':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 2592000000;
                    break;
                case 'Dernière année':
                    matchesPeriod = (now.getTime() - buildDate.getTime()) <= 31536000000;
                    break;
                default:
                    break;
            }

            return matchesRepoType && matchesTag && matchesPeriod;
        });
        setFilteredBuilds(filtered);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredBuilds.length / itemsPerPage);
    const displayedBuilds = filteredBuilds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="text-center mb-4">
                <h1 className="text-center font-semibold">SecureEduMail</h1>
                <p>Téléchargez les dernières versions ci-dessous</p>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div className="flex items-center space-x-4">
                        <select
                            onChange={handleRepoTypeChange}
                            value={selectedRepoType}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Tout">Tout</option>
                            <option value="SecureEduMail">SecureEduMail</option>
                            <option value="SecureEduRest">SecureEduRest</option>
                            <option value="SecureEduCrypt">SecureEduCrypt</option>
                        </select>
                        <select
                            onChange={handleTagChange}
                            value={selectedTag}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Tag">Tag</option>
                            <option value="Alpha">Alpha</option>
                            <option value="Beta">Beta</option>
                            <option value="Stable">Stable</option>
                            <option value="Patch">Patch</option>
                        </select>
                        <select
                            onChange={handlePeriodChange}
                            value={selectedPeriod}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Toute période">Toute période</option>
                            <option value="Dernière heure">Dernière heure</option>
                            <option value="Dernier jour">Dernier jour</option>
                            <option value="Dernier mois">Dernier mois</option>
                            <option value="Dernière année">Dernière année</option>
                        </select>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 16.293L12.95 11.95A6.5 6.5 0 1 0 11.95 12.95l4.343 4.343a1 1 0 0 0 1.414-1.414l-.414-.414Z" />
                                <path fillRule="evenodd" d="M10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10ZM15 10A5 5 0 1 1 10 5a5 5 0 0 1 0 10ZM1 10C1 4.477 5.477 0 10 0s9 4.477 9 10-4.477 10-10 10S1 15.523 1 10Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            onChange={handleSearch}
                            className="block p-2.5 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Rechercher"
                        />
                    </div>
                </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Nom</th>
                    <th scope="col" className="px-6 py-3">Hash</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Version</th>
                    <th scope="col" className="px-6 py-3">Type</th>
                    <th scope="col" className="px-6 py-3">Tag</th>
                    <th scope="col" className="px-6 py-3">Téléchargement</th>
                    <th scope="col" className="px-6 py-3">GitHub</th>
                </tr>
                </thead>
                <tbody>
                {displayedBuilds.map((build) => (
                    <tr key={build.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{build.id}</td>
                        <td className="px-6 py-4">{build.name}</td>
                        <td className="px-6 py-4">{build.hash}</td>
                        <td className="px-6 py-4">{build.date}</td>
                        <td className="px-6 py-4">{build.version}</td>
                        <td className="px-6 py-4">{build.type}</td>
                        <td className="px-6 py-4">{build.tag}</td>
                        <td className="px-6 py-4"><a href={build.downloadLink} className="text-blue-600 hover:underline">Télécharger</a></td>
                        <td className="px-6 py-4"><a href={build.githubLink} className="text-blue-600 hover:underline">GitHub</a></td>
                    </tr>
                ))}
                </tbody>
            </table>

            <nav className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredBuilds.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredBuilds.length}</span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DownloadPage;
