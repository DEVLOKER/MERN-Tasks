import { AccessTokenInfo, RefreshTokenInfo } from "@/shared/types/Token";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const randomKey = () => {
    return uuidv4();
};

export const prepareSearchQuery = (obj: object) => {
    const searchQuery: string[] = [];
    Object.keys(obj).map((key: string) => {
        if (!obj.hasOwnProperty(key)) return;
        const value = obj[key as keyof object];
        value !== null &&
            searchQuery.push(
                `${searchQuery.length === 0 ? `?` : `&`}${key}=${value}`
            );
    });
    return searchQuery.join("");
};
