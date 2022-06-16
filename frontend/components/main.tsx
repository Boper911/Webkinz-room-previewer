import React, { createContext, useEffect, useState } from "react";

import styles from "../styles/generateRoom.module.css";

import Middle from "./middle";
import Search from "./search";

import { getPreviewImages, searchImages } from "../api/api";
import LoadMore from "./loadMore";

type Props = {};

export default function GenerateRoom({}: Props) {
  const [wallpaperImageList, setWallpaperImageList] = useState<Array<string>>(
    []
  );
  const [flooringImageList, setFlooringImageList] = useState<Array<string>>([]);
  const [nextWallpaperCursor, setNextWallpaperCursor] = useState<number>(0);
  const [nextFlooringCursor, setNextFlooringCursor] = useState<number>(0);

  const [wallpaperSearchValue, setWallpaperSearchValue] = useState<string>("");
  const [flooringSearchValue, setFlooringSearchValue] = useState<string>("");

  const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
  const [selectedFlooring, setSelectedFlooring] = useState<string>("");

  async function fetchImages(type: string, nextCursor: number) {
    const responseJson = await getPreviewImages(type, nextCursor);
    for (let index = 0; index < responseJson.data.length; index++) {
      const name = responseJson.data[index];
      responseJson.data[
        index
      ] = `http://192.168.1.5:5000/api/image/${type}/${name}`;
    }

    if (type == "flooring") {
      setFlooringImageList(responseJson.data);
      setNextFlooringCursor(responseJson.nextCursor);
    } else if (type == "wallpaper") {
      setWallpaperImageList(responseJson.data);
      setNextWallpaperCursor(responseJson.nextCursor);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchImages("wallpaper", nextWallpaperCursor);
      await fetchImages("flooring", nextFlooringCursor);
    };

    fetchData();
  }, []);

  const handleLoadMoreButtonClick = async (
    type: string,
    searchValue: string,
    nextCursor: number
  ) => {
    const responseJson = await searchImages(type, searchValue, nextCursor);

    if (type == "flooring") {
      setFlooringImageList((currentList) => [
        ...currentList,
        ...responseJson.data,
      ]);
      setNextFlooringCursor(responseJson.nextCursor);
    } else if (type == "wallpaper") {
      setWallpaperImageList((currentList) => [
        ...currentList,
        ...responseJson.data,
      ]);
      setNextWallpaperCursor(responseJson.nextCursor);
    }
  };

  const handleWallpaperFormSubmit = async (event: any) => {
    event.preventDefault();

    const responseJson = await searchImages(
      "wallpaper",
      wallpaperSearchValue,
      nextWallpaperCursor
    );
    setWallpaperImageList(responseJson.data);
    setNextWallpaperCursor(responseJson.nextCursor);
  };

  const handleFlooringFormSubmit = async (event: any) => {
    event.preventDefault();

    const responseJson = await searchImages(
      "flooring",
      flooringSearchValue,
      nextFlooringCursor
    );
    setFlooringImageList(responseJson.data);
    setNextFlooringCursor(responseJson.nextCursor);
  };

  const resetWallpaperForm = async (event: any) => {
    await fetchImages("wallpaper", 0);
    setWallpaperSearchValue("");
  };

  const resetFlooringForm = async (event: any) => {
    await fetchImages("flooring", 0);
    setFlooringSearchValue("");
  };

  const callbackShowPart = async (type: string, item: string) => {
    if (type == "wallpaper") setSelectedWallpaper(item);
    if (type == "flooring") setSelectedFlooring(item);
  };

  return (
    <div className={styles.main}>
      <div className="bg-slate-800">
        <form onSubmit={handleWallpaperFormSubmit} className="px-4 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Wallpapers..."
              onChange={(event) => {
                setNextWallpaperCursor(0);
                setWallpaperSearchValue(event.target.value);
              }}
            ></input>
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <Search
          type="wallpaper"
          imageList={wallpaperImageList}
          handler={callbackShowPart}
        />

        <LoadMore
          callback={() =>
            handleLoadMoreButtonClick(
              "wallpaper",
              wallpaperSearchValue,
              nextWallpaperCursor
            )
          }
          disabled={nextWallpaperCursor ? false : true}
        />
      </div>

      <div className={styles.item_main}>
        <Middle
          wallpaperPreview={selectedWallpaper}
          flooringPreview={selectedFlooring}
        />
      </div>

      <div className="bg-slate-800">
        <form onSubmit={handleFlooringFormSubmit} className="px-4 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Floors..."
              onChange={(event) => {
                setNextFlooringCursor(0);
                setFlooringSearchValue(event.target.value);
              }}
            ></input>
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <Search
          type="flooring"
          imageList={flooringImageList}
          handler={callbackShowPart}
        />

        <LoadMore
          callback={() =>
            handleLoadMoreButtonClick(
              "flooring",
              flooringSearchValue,
              nextFlooringCursor
            )
          }
          disabled={nextFlooringCursor ? false : true}
        />
      </div>
    </div>
  );
}
