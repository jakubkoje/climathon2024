import postgres from 'postgres'
const sql = postgres({
  host: '188.245.91.0',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
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
