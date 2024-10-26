import { sql as sqlDrizzle } from 'drizzle-orm';
import {useDb} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const { boundingBox } = await readBody<{ boundingBox: number[][] }>(event);
    const db = useDb();

    const query = `WITH bbox AS (
        SELECT ST_MakePolygon(ST_MakeLine(ARRAY[
                                              ST_SetSRID(ST_MakePoint(${boundingBox[0][0]}, ${boundingBox[0][1]}), 4326),
                                              ST_SetSRID(ST_MakePoint(${boundingBox[1][0]}, ${boundingBox[1][1]}), 4326),
                                              ST_SetSRID(ST_MakePoint(${boundingBox[2][0]}, ${boundingBox[2][1]}), 4326),
                                              ST_SetSRID(ST_MakePoint(${boundingBox[3][0]}, ${boundingBox[3][1]}), 4326),
                                              ST_SetSRID(ST_MakePoint(${boundingBox[4][0]}, ${boundingBox[4][1]}), 4326)
                                              ])) AS geom
    )

                   SELECT EXISTS (
                       SELECT 1
                       FROM lands_without_lines p, bbox
                       WHERE ST_Contains(p.wkb_geometry, bbox.geom)
                   ) AS is_bbox_fully_contained;`;

    const result = await db.execute(query);
    const output = result.rows[0];

    return { output };
});
