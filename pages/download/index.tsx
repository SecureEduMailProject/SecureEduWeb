// pages/download/index.tsx
'use client'

import { useState } from 'react';

const data = [

    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },
    {
        id: 774,
        name: 'secureedurest-1.20.1-773-alpha.zip',
        hash: '15359ed36b96912d18c83077cb1a64a7',
        date: '2024-07-26',
        version: 'v1.20.3',
        tag: 'Stable',
        type: 'SecureEduRest',
        downloadLink: 'https://example.com/secureeducrypt-1.20.1-773-alpha.zip',
        githubLink: 'https://github.com/your-repo/commit/773'
    },

    // Ajoutez d'autres données ici pour le test
    // Ajoutez d'autres éléments pour tester la pagination
];

const DownloadPage = () => {
    const [builds, setBuilds] = useState(data);
    const [filteredBuilds, setFilteredBuilds] = useState(data);
    const [selectedRepoType, setSelectedRepoType] = useState('Tout');
    const [selectedTag, setSelectedTag] = useState('Tag');
    const [selectedPeriod, setSelectedPeriod] = useState('Toute période');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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
        setCurrentPage(1); // Reset to the first page on search
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
        setCurrentPage(1); // Reset to the first page on filter
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
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="text-center mb-6">
                <h1 className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
                    data-aos="zoom-y-out" data-aos-delay={150}>
                    SecureEduMail <br className="max-lg:hidden"/>
                    Une plateforme éducative sécurisée pour les étudiants.
                </h1>
                <div className="mx-auto max-w-3xl">
                    <p className="mb-8 text-lg text-gray-700" data-aos="zoom-y-out" data-aos-delay={300}>
                        Vous pouvez retrouver tout les téléchargements de chaque référenciel juste ici.
                    </p>
                </div>
            </div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div
                    className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
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
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m19 19-4-4m1.5-2.5a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0Z"/>
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
                    <tr key={build.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4"><span
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">#{build.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis"><span
                            className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{build.name}</span>
                        </td>
                        <td className="px-6 py-4"><span
                            className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{build.hash}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis"><span
                            className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{build.date}</span>
                        </td>
                        <td className="px-6 py-4"><span
                            className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{build.version}</span>
                        </td>
                        <td className="px-6 py-4"><span
                            className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">{build.type}</span>
                        </td>
                        <td className="px-6 py-4"><span
                            className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{build.tag}</span>
                        </td>
                        <td className="px-6 py-4"><a href={build.downloadLink}
                                                     className="text-blue-600 hover:underline">
                            <button type="button"
                                    className="py-2 px-6 me-1 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Télécharger
                            </button>
                        </a></td>
                        <td className="px-6 py-8 flex justify-center items-center">
                            <a href={build.githubLink} className="text-blue-600 hover:underline px-2"
                               aria-label="GitHub">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.64 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </td>

                    </tr>

                ))}
                </tbody>
            </table>

            <nav className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4"
                 aria-label="Table navigation">
                <span
                    className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span
                    className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span
                    className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredBuilds.length)}</span> of <span
                    className="font-semibold text-gray-900 dark:text-white">{filteredBuilds.length}</span>
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
                    {Array.from({length: totalPages}, (_, index) => (
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
