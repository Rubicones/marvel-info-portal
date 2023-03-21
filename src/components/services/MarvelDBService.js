//539beee6cf0f07274df5c6df167cf58f public
//04ab30b507d17c9f6f9e4903b67ebeaced75fd4a private
import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=539beee6cf0f07274df5c6df167cf58f"

    const {loading, error, request, clearError} = useHttp()

    const getAllCharacters = async (offset = 210, limit = 36) => {
        const chars = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`)
        return chars.data.results.map(_transformData)
    }

    const getCharacter = async (id) => {
        const char = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformData(char.data.results[0])
    }

    const _transformData = (results) => {
        return {
            name: results.name,
            id: results.id,
            description: results.description,
            thumbnail: `${results.thumbnail.path}.${results.thumbnail.extension}`,
            homepage: results.urls[0].url,
            wiki: results.urls[1].url,
            comics: results.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService