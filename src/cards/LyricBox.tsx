import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function LyricBox() {
  const [lyrics, setLyrics] = useState<
    {
      lyric: string;
      artist: string;
      song?: string;
    }[]
  >([
    {
      lyric:
        "J'ai pardonne ceux qui m'ont fait du mal quand j'ai vu qu'ceux a qui j'ai fait du mal me pardonnaient",
      artist: "Dinos",
      song: "93 mesures",
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [currentLyric, setCurrentLyric] = useState(lyrics[0]);

  useEffect(() => {
    const storedLyrics = localStorage.getItem("lyrics");
    if (storedLyrics) {
      setLyrics(JSON.parse(storedLyrics));
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore 'e' key press if the active element is an input, textarea, or contenteditable
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement?.getAttribute("contenteditable") === "true"
      ) {
        return;
      }

      if (event.key === "e" || event.key === "E") {
        setEditMode((prevMode) => !prevMode);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function getRandomLyric() {
    return lyrics[Math.floor(Math.random() * lyrics.length)];
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCurrentLyric((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    setLyrics((prev) => [...prev, currentLyric]);
    setEditMode(false);
    localStorage.setItem("lyrics", JSON.stringify([...lyrics, currentLyric]));
  }

  return (
    <div className="w-full h-full row-span-2 col-span-6">
      <Card title=".wow">
        {editMode ? (
          <div className="p-2 space-y-2">
            <input
              className="w-full focus:outline-none"
              name="lyric"
              value={currentLyric.lyric}
              onChange={handleInputChange}
              placeholder="Enter lyric"
            />
            <div className="flex space-x-2">
              <input
                className="w-1/2 focus:outline-none"
                name="artist"
                value={currentLyric.artist}
                onChange={handleInputChange}
                placeholder="Artist"
              />
              <input
                className="w-1/2 focus:outline-none"
                name="song"
                value={currentLyric.song}
                onChange={handleInputChange}
                placeholder="Song"
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="p-2 space-x-2">
            {(() => {
              const { lyric, artist, song } = getRandomLyric();
              if (!lyric || !artist) return null;
              return (
                <>
                  <span className="text-md font-bold">{lyric}</span> -
                  <span className="text-md font-semibold">
                    {artist} <span className="font-medium">({song})</span>
                  </span>
                </>
              );
            })()}
          </div>
        )}
      </Card>
    </div>
  );
}
