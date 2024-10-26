import postgres from 'postgres'
const sql = postgres({
  host: 'localhost',
  port: 6767,
  user: 'postgres',
  password: '',
  database: 'postgres'
})
export default defineEventHandler(async (event) => {
  const test = await sql`SELECT json_build_object(
                                        'type', 'FeatureCollection',
                                        'features', json_agg(
                                                json_build_object(
                                                        'type', 'Feature',
                                                        'properties', row_to_json(t)::jsonb - 'wkb_geometry',
                                                        'geometry', ST_AsGeoJSON(t.wkb_geometry)::json
                                                )
                                                    )
                                ) AS geojson
                         FROM (SELECT * FROM waters) t;`
  console.log(test)
  return test
})
