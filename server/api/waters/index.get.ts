import postgres from 'postgres'
import {useDb} from "~~/server/utils/db";
import {sql} from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const db = useDb()
  const waters = await db.execute(sql`SELECT json_build_object(
                                        'type', 'FeatureCollection',
                                        'features', json_agg(
                                                json_build_object(
                                                        'type', 'Feature',
                                                        'properties', row_to_json(t)::jsonb - 'wkb_geometry',
                                                        'geometry', ST_AsGeoJSON(t.wkb_geometry)::json
                                                )
                                                    )
                                ) AS geojson
                         FROM (SELECT * FROM waters) t;`)
  return waters.rows
})
